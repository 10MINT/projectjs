function saveProject(data) {
    fetch(window.location.href, { 
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            content: document.querySelector('#content').value,
            name: document.querySelector('#nameInput').value,
            public: document.querySelector('#publicSwitch').checked
        })
    });
}

function deleteProject(id = window.location.href) {
    $('#deleteModal').modal('hide');
    fetch(id, { 
        method: 'DELETE',
    })
    .then((res) => { 
        if (res.ok) {
          window.open('/projects', '_self') ;
        } 
    });
}
