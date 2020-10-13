import React, { useEffect, useState } from "react"
import Axios from "axios"
import Card from "./Card"
import Column from "./Column"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import { styled } from "../stitches.config"

const StyledColumns = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  margin: "0 3vw",
  width: "80%",
  height: "80vh",
  gap: "8px",
})

function Content() {
  // const initialColumns = {
  //   todo: {
  //     id: "todo",
  //     list: ["item 1", "item 2", "item 3"]
  //   },
  //   doing: {
  //     id: "doing",
  //     list: []
  //   },
  //   done: {
  //     id: "done",
  //     list: []
  //   }
  // }

  const [isLoading, setIsLoading] = useState(true)
  const [columns, setColumns] = useState({})

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await Axios.get("http://localhost:8000/project/1", {
          headers: {
            Authorization: "Token 3edf72f7a8df60093532f4fe156d66a6b140f7a0",
            "Content-Type": "application/json",
          },
        })
        // setInitialColumn(response.data.board_column[0].task)
        // console.log(response.data.board_column)
        const colData = {}
        response.data.board_column.map((col) => {
          colData[col.name] = {
            id: col.name,
            list: col.task.map((t) => t.name),
          }
        })

        // response.data.board_column.map(item => {
        //   initialColumns[item.name] = {
        //     id: item.name,
        //     list: item.map(task => [task.name])
        //   }

        // })
        // console.log(initialColumns)
        setColumns(colData)
        setIsLoading(false)
      } catch (e) {
        console.log("There was a problem...")
      }
    }
    fetchTasks()
  }, [])

  // const [columns, setColumns] = useState(initialColumns)

  const onDragEnd = ({ source, destination }) => {
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null

    // Make sure we're actually moving the item
    if (source.droppableId === destination.droppableId && destination.index === source.index) return null

    // Set start and end variables
    const start = columns[source.droppableId]
    const end = columns[destination.droppableId]

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start.list.filter((_, idx) => idx !== source.index)

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index])

      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        list: newList,
      }

      // Update the state
      setColumns((state) => ({ ...state, [newCol.id]: newCol }))
      return null
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter((_, idx) => idx !== source.index)

      // Create a new start column
      const newStartCol = {
        id: start.id,
        list: newStartList,
      }

      // Make a new end list array
      const newEndList = end.list

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index])

      // Create a new end column
      const newEndCol = {
        id: end.id,
        list: newEndList,
      }

      // Update the state
      setColumns((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }))
      return null
    }
  }

  if (isLoading) return <div style={{ marginLeft: "250px", height: "88vh" }}>Loading...</div>
  console.log(columns)
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
                <StyledColumns>
                  {Object.values(columns).map((col) => (
                    <Column col={col} key={col.id} />
                  ))}
                </StyledColumns>
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
