module.exports = (data) => {
  var courses = [];
  let viewedCourse = {}
  for (let i = 0; i < data.length; i++) {
    if (!viewedCourse[data[i].course_name]) {
      viewedCourse[data[i].course_name] = data[i].course_name;
      courses.push({
        name: data[i].course_name,
        id: data[i].course_id,
        domain: data[i].domain,
        description: data[i].description,
        tests: [{
          id: data[i].id,
          name: data[i].name,
          numQuestions: data[i].num_of_questions,
          duration: data[i].duration
        }]
      })
    } else {
      courses[courses.length - 1].tests.push({
          id: data[i].id,
          name: data[i].name,
          numQuestions: data[i].num_of_questions,
          duration: data[i].duration
      })
    }
  }
  return courses;
}