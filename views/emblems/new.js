const form = document.getElementById("new-emblem-form");
const onNewEmblemSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  for (let [key, value] of formData) {
    console.log(`key=${key}, value=${value}`);
  }
  // TODO save new model
  // TODO goto options page
}
form.addEventListener("submit", onNewEmblemSubmit);