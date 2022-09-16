async function editBtnHandler(event) {
    // event.preventDefault();
  
    if (event.target.tagName.toLowerCase() == 'button') {

      if (!event.target.name) {
        alert(response.statusText);
      } else {
      // get name of button
      const btnString = event.target.name;
  
      document.location.replace(`/api/restaurants/${btnString}`);

      // const response = await fetch(`/api/restaurants/${btnString}`, {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // });

      // if (!response) {
      //   res.status(500);
      // // } else {
      // //   // parse restaurant object from response
      // //   let restaurant = response;

      // //   console.log(restaurant);

      // //   res.render('edit-restaurant', restaurant);
      // };
    };
  };
};
  
document.querySelector('#restaurants-list').addEventListener('click', editBtnHandler);