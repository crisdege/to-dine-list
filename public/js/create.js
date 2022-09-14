async function newFormHandler(event) {
  event.preventDefault();

  const name = document.querySelector('input[name="restaurant-name"]').value;
  const cuisine_id = document.querySelector('select[name="cuisine"]').value;
  const location = document.querySelector('input[name="location"]').value;
  const rating = document.querySelector('select[name="rating"]').value;
  const notes = document.querySelector('textarea[name="notes"]').value;

  const response = await fetch(`/api/restaurants`, {
    method: "POST",
    body: JSON.stringify({
      name,
      cuisine_id,
      location,
      rating,
      notes,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
}

document.querySelector(".add-btn").addEventListener("submit", newFormHandler);
