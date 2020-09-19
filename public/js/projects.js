
$().ready( function() {
    $('.card-link.text-danger').on('click', e => { if (confirm("Delete project?")) deleteProject(e.attr("data-id"))});
    $('#toggle-cards,#toggle-list').on('click', function() {
        $('#toggle-cards').toggleClass('btn-light');
        $('#toggle-cards').toggleClass('btn-dark');
        $('#toggle-list').toggleClass('btn-dark');
        $('#toggle-list').toggleClass('btn-light');
        $('.card-title').toggleClass('d-inline-block');
        $('.card-title').toggleClass('w-25');
        $('.card-text').toggleClass('d-inline-block');
        $('.card-text').toggleClass('w-50');
        $('.card-text').toggleClass('my-0');        
        $('.list').toggleClass('row-cols-sm-2 row-cols-md-3 row-cols-lg-4');   
    });

    if (document.querySelector('#projectList')) {
        let options = {
            valueNames: [
                'card-title',
                { data: ['updated','created'] }
            ]
        };
    
        let projectList = new List('projectList', options);
    }
} );