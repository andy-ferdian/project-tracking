async getArticleGroupbyYear(param) {
  let paramId = param;
  let url = null;
  let lang = localStorage.getItem("language");
  if (lang === "English") {
    url = this.base_api + 'articles/group_by_year/?widget=${paramId}&language=en';
  } else {
    url = this.base_api + 'articles/group_by_year/?widget=${paramId}&language=vi';
  }
return await axios.get(url, {
paramId: {},
headers: {
  Authorization: `Token ${this.token}`,
  "Content-Type": "application/json",
},
});
}

async getArticleGroupbyYear(param) {
  let paramId = param;
  let url = null;
  let lang = localStorage.getItem('language');
  if (lang === 'English') {
  url = this.base_api + `articles/group_by_year/?widget=${paramId}&language=en`;
  } else {
  url = this.base_api + `articles/group_by_year/?widget=${paramId}&language=vi`;
  }
  return await axios.get(url, {
     paramId: {},
     headers: {
         Authorization: `Token ${this.token}`,
         'Content-Type': 'application/json',
     },
  });
}
