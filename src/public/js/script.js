$(document).ready(function() {
    $('#form-add-club').submit(function(e) {
	   	e.preventDefault();
   		$.ajax({
   			url: '/clubs',
   			method: 'POST',
            data: new FormData(this),
            processData: false,
            contentType: false,
   			dataType: 'html',
   			success: function(data) {
   				$('#form-add-club')[0].reset();
                $('#addClubModal').hide();
                $('.modal-backdrop').hide();
                $('#clubs-table').html(data);
   			}
   		})	   	
    })

    $('#search').keyup(function() {
        var keyword = $(this).val();
        $.ajax({
        	type: 'POST',
        	url: '/clubs/search',
        	data: {keyword:keyword},
        	success: function(data) {
        		$('#clubs-table').html(data);
        	}
        })
    })



    $('#btn-delete').click(function(e) {
        e.preventDefault();
        var id = $(this).attr("data-id");
        $.ajax({
            type: 'GET',
            url: '/clubs/delete/'+ id,
            dataType: 'html',
            success: function(data) {
                  $('.modal-backdrop').hide();
                  $('#clubs-table').html(data);
                  $('#modal-del').hide();
            }
         })
    })


    $('#form-edit-club').submit(function(e) {
         e.preventDefault();
        var id = $('#clubId').val();
        $.ajax({
            url: '/clubs/update/' + id,
            method: 'POST',
            data: new FormData(this),
            processData: false,
            contentType: false,
            dataType: 'html',
            success: function(data) {
                $('#form-add-club')[0].reset();
                $('#modal-edit').hide();
                $('.modal-backdrop').hide();
                $('#clubs-table').html(data);
            }
        })  
    })

})

// =============================
function deleteClub(id) {
    $('#btn-delete').attr('data-id',id);
}

function editClub(id) {
    $.ajax({
        url :'/clubs/edit/' + id,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            var logo = data.clubs.logo;
            $('input[name="name"]').val(data.clubs.name);
            $('input[name="coach"]').val(data.clubs.coach);
            $('input[name="stadium"]').val(data.clubs.stadium);
            $('#clubId').val(data.clubs._id);
            var src = 'uploads/' + logo;
            $('#logo-img').attr('src',src);
        }
    })
}

$("#message-alert").fadeTo(2000, 700).slideUp(700, function(){
   $("#message-alert").slideUp(700);
});