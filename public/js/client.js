function saveProject() {
    fetch(window.location.href, { 
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: document.querySelector('#name').value,
            description: document.querySelector('#description').value,
            content: document.querySelector('#content').value,
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

$().ready( function() {
    $('#confirmDeleteButton').on('click', deleteProject);
    $('#saveButton').on('click', saveProject);
} );
