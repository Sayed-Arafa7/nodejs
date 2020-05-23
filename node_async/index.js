async function task() {
    const students = await getStudent();
    console.log(students);

    const courses = await getCourses(students[0]);
    console.log(courses);

    const lectures = await getLectures(courses[0]);
    console.log(lectures);

}

console.log("1")
task()
console.log("2")



function getStudent() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(["Student 2", "Student 1", "Student 3"])
        }, 2000)
    })
}

function getCourses(student) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(["COurse 2", "Course 1", "Course 3"])
        }, 2000)
    })
}

function getLectures(course) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(["Lecture 2", "Lecture 1", "Lecture 3"])
        }, 2000)
    })
}