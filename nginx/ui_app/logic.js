function newDiv(data) {
    let responseContainer = document.querySelector('.response-container');
    // Create repsonse item
    let response_item = document.createElement('div');
    response_item.classList.add('response-item');
    response_item.id = data['id'];
    // Create response fullname
    let response_fullname = document.createElement('div');
    response_fullname.textContent = data['first_name'] + ' ' + data['last_name'];
    response_fullname.classList.add('response-fullname');
    response_item.appendChild(response_fullname);
    // Create delete img
    let delete_img = document.createElement('img');
    delete_img.src = 'delete.png';
    delete_img.classList.add('delete-img');
    delete_img.addEventListener('click', () => {
        if (sendDeleteRequest(data)){
            response_item.remove();
        }
    });
    response_item.appendChild(delete_img);
    // Create response role
    let response_role = document.createElement('div');
    response_role.textContent = data['role'];
    response_role.classList.add('response-role');
    response_item.appendChild(response_role);
    // Append response item to response container
    responseContainer.appendChild(response_item);
}

async function sendGetRequest() {
    try {
        const response = await fetch('http://localhost:8000/');
        const responseData = await response.json();
        responseData.forEach((data) => {
            newDiv(data);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

async function sendPostRequest(data) {
    try {
        const response = await fetch('http://localhost:8000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        let niggas = responseData['message'];
        console.log(niggas);
        console.log(niggas == 'User added successfully')
        if (niggas == 'User added successfully'){
            newDiv(data);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function sendDeleteRequest(data) {
    try {
        const response = await fetch('http://localhost:8000/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        if (responseData['message'] == 'User deleted successfully') {
            returnvalue = true;
        }
    } catch (error) {
        console.error('Error:', error);
        returnvalue = false;
    }
    return returnvalue;
}

document.addEventListener('DOMContentLoaded', () => {
    sendGetRequest();

    let myform = document.getElementById('myform');
    if (myform) {
        myform.addEventListener('submit', async (event) => {
            event.preventDefault();
            console.log('myform submission started');
            const data = { 
                first_name: document.getElementById('first_name').value, 
                last_name: document.getElementById('last_name').value,
                role: document.getElementById('role').value
            };
            sendPostRequest(data);
        })
    }
    else {
        console.error('myform not found');
    }
});