$(document).ready(function() {
  $(".update-form").submit(function(e) {
    e.preventDefault();

    const form = $(this);
    const studentId = form.data("student-id");
    const placementValue = form.find("input[name=placement]").val();
    const companyResult = form.find("select[name=companyResult]").val();

    $.ajax({
      url: `/students/updatePlacement/${studentId}`,
      method: "POST",
      data: {
        companyResult: companyResult
      },
      success: function(data) {
        if (data.success) {
          console.log(`Placement status updated for student ${data.student_id}`);
          // Optionally update the UI to reflect the new status
        } else {
          console.log(data);
          alert("An error occurred while updating the placement status.");
        }
      },
      error: function(xhr, status, error) {
        console.error("Error:", error);
        alert("An error occurred while updating the placement status. Please try again later.");
      }
    });
  });

  function deleteStudent(deleteLink) {
    $(deleteLink).click(function(e) {
      e.preventDefault();

      $.ajax({
        url: $(deleteLink).prop('href'),
        method: "DELETE",
        success: function(data) {
          if (data.success) {
            $(`#student-${data.student_id}`).closest('tr').remove();
            console.log(`Removing row with ID: #student-${data.student_id}`);
          } else {
            console.log(data);
            alert("An error occurred while deleting the student.");
          }
        },
        error: function(xhr, status, error) {
          console.log("Error:", error);
          alert("An error occurred while deleting the student. Please try again later.");
        }
      });
    });
  }

  const deleteButtons = document.querySelectorAll(".btn-delete");
  deleteButtons.forEach(function(button) {
    deleteStudent(button);
  });
});
