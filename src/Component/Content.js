import React, { useEffect, useState } from "react"
import Axios from "axios"
// import Card from "./Card"
import Card from "./Card"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import styled from "styled-components"

const Title = styled.h1`
  color: #7b7b7b;
  font-family: sans-serif;
  font-size: 30px;
  text-align: center;
  padding-top: 25px;
`

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 25px;
`

function Content() {
  const initialData = {
    tasks: {
      "task-1": { id: "task-1", content: "Learn React JS" },
      "task-2": { id: "task-2", content: "Learn Vue JS" },
      "task-3": { id: "task-3", content: "Learn Angular JS" },
      "task-4": { id: "task-4", content: "Learn Svelte JS" },
    },
    cards: {
      "card-1": {
        id: "card-1",
        title: "todo",
        taskIds: ["task-1", "task-2", "task-3", "task-4"],
        color: "#FFBA08",
      },
      "card-2": {
        id: "card-2",
        title: "doing",
        taskIds: [],
        color: "#17C9FF",
      },
      "card-3": {
        id: "card-3",
        title: "completed",
        taskIds: [],
        color: "#14E668",
      },
    },
    cardOrder: ["card-1", "card-2", "card-3"],
  }

  const [isLoading, setIsLoading] = useState(true)
  const [state, setState] = useState({})

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await Axios.get("http://localhost:8000/project/1/", {
          headers: {
            Authorization: "Token 3edf72f7a8df60093532f4fe156d66a6b140f7a0",
            "Content-Type": "application/json",
          },
        })
        // setInitialColumn(response.data.board_column[0].task)
        // console.log(response.data.board_column)
        // const colData = {}
        // response.data.board_column.map(col => {
        //   colData[col.name] = {
        //     id: col.name,
        //     list: col.task.map(t => t.name)
        //   }
        // })

        // response.data.board_column.map(item => {
        //   initialColumns[item.name] = {
        //     id: item.name,
        //     list: item.map(task => [task.name])
        //   }

        // })
        console.log(response.data)
        setState(response.data)
        setIsLoading(false)
      } catch (e) {
        console.log("There was a problem...")
      }
    }
    fetchTasks()
  }, [])

  // const [columns, setColumns] = useState(initialColumns)

  const onDragEnd = (result) => {
    const { draggableId, source, destination, type } = result
    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return
    }

    if (type === "card") {
      const newCardOrder = Array.from(state.cardOrder)
      newCardOrder.splice(source.index, 1)
      newCardOrder.splice(destination.index, 0, draggableId)

      const newState = {
        ...state,
        cardOrder: newCardOrder,
      }
      setState(newState)
      return
    }

    if (type === "task") {
      const start = state.cards[source.droppableId]
      const finish = state.cards[destination.droppableId]

      if (start === finish) {
        const card = state.cards[source.droppableId]
        const newTaskIds = Array.from(card.taskIds)
        newTaskIds.splice(source.index, 1)
        newTaskIds.splice(destination.index, 0, draggableId)
        const newCard = {
          ...card,
          taskIds: newTaskIds,
        }
        const newState = {
          ...state,
          cards: {
            ...state.cards,
            [newCard.id]: newCard,
          },
        }
        setState(newState)
        return
      }
      // move to another card
      const startTaskIds = Array.from(start.taskIds)
      startTaskIds.splice(source.index, 1)
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      }

      const finishTaskIds = Array.from(finish.taskIds)
      finishTaskIds.splice(destination.index, 0, draggableId)
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      }

      const newState = {
        ...state,
        cards: {
          ...state.cards,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      }
      setState(newState)
      return
    }
  }

  if (isLoading) return <div style={{ marginLeft: "250px", height: "88vh" }}>Loading...</div>
  // console.log(columns)
  return (
    <>
      <div className='content-wrapper'>
        <div className='content-header'>
          <div className='container-fluid' style={{ height: "88vh" }}>
            {/* <p>Board</p> */}
            {/* <div className="row">
              {tasks.map(task => {
                return (
                  <div className="col-md-2">
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title">{task.name}</h3>
                      </div>
                      <div className="card-body">
                        {task.task.map(t => {
                          return <div className="card p-3">{t.name}</div>
                        })}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div> */}
            <div className='row'>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='all-cards' direction='horizontal' type='card'>
                  {(provided) => (
                    <CardContainer ref={provided.innerRef} {...provided.droppableProps}>
                      {state.cardOrder.map((cardId, index) => {
                        console.log(cardId, index)
                        const card = state.cards[cardId]
                        const tasks = card.taskIds.map((taskId) => state.tasks[taskId])
                        return <Card key={cardId} card={card} tasks={tasks} index={index} />
                      })}
                      {provided.placeholder}
                    </CardContainer>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
            {/* <Card /> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Content
