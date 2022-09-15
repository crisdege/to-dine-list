async function editFormHandler(event) {
  event.preventDefault();

  const name = document.querySelector('input[name="restaurant-name"]').value;
  const cuisine = document.querySelector('select[name="cuisine"]').value;
  const location = document.querySelector('input[name="location"]').value;
  const rating = document.querySelector('select[name="rating"]').value;
  const note = document.querySelector('textarea[name="note"]').value;
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/restaurants/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      name,
      cuisine,
      location,
      rating,
      notes,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  document.location.replace("/");

  // if (response.ok) {
  //   document.location.replace('/');
  // } else {
  //   alert(response.statusText);
  // };
}

document.querySelector("#edit-btn").addEventListener("submit", editFormHandler);
