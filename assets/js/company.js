$(document).ready(function() {
  $(".update-form").submit(function(e) {
    e.preventDefault();

    const form = $(this);
    const studentId = form.data("student-id");
    const companyName = form.data("company-name");
    const companyResult = form.find("select[name=companyResult]").val();

    $.ajax({
      url: `/company/update-status/${studentId}`,
      method: "POST",
      data: {
        companyName: companyName,
        companyResult: companyResult
      },
      success: function(data) {
        if (data.success) {
          console.log(`Interview status updated for student ${data.student_id}`);
          // Optionally update the UI to reflect the new status
        } else {
          console.log(data);
          alert("An error occurred while updating the interview status.");
        }
      },
      error: function(xhr, status, error) {
        console.error("Error:", error);
        alert("An error occurred while updating the interview status. Please try again later.");
      }
    });
  });
});
