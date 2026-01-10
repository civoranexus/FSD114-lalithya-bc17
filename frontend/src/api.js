const API = "http://127.0.0.1:8000/api";

/* -----------------------------
   AUTH
----------------------------- */

export async function login(username, password) {
  const res = await fetch(`${API}/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  return res.json();
}

export const authHeader = () => ({
  Authorization: "Bearer " + localStorage.getItem("token"),
});

/* -----------------------------
   DASHBOARD & PROGRESS
----------------------------- */

export const getDashboard = async () => {
  const res = await fetch(`${API}/student/dashboard/`, {
    headers: authHeader(),
  });
  return res.json();
};

export const resumeCourse = async (courseId) => {
  const res = await fetch(`${API}/student/course/${courseId}/resume/`, {
    headers: authHeader(),
  });
  return res.json();
};

/* -----------------------------
   COURSES & LESSONS
----------------------------- */

export const getCourseLessons = async (courseId) => {
  const res = await fetch(`${API}/courses/${courseId}/lessons/`, {
    headers: authHeader(),
  });
  return res.json();
};