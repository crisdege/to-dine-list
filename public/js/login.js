async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#').value.trim();  
    const password = document.querySelector('#').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      //check if the response status
      if (response.ok) {
        console.log('success');
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }  
  }
  
  async function loginFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#').value.trim();
    const password = document.querySelector('#').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/api/restaurants');
      } else {
        alert(response.statusText);
      }
    }
  }
  
  document.querySelector('#').addEventListener('submit', signupFormHandler); //need to add sign up btn id
  document.querySelector('#').addEventListener('submit', loginFormHandler); //need to add sign in btn id