// Submits to Groove CRM without redirecting the user.
// Uses no-cors so the opaque response is fine — we show success either way.
function grooveSubmit(e, formId, successId) {
  e.preventDefault();
  const form = document.getElementById(formId);
  const btn  = form.querySelector('[type="submit"]');
  if (btn) { btn.disabled = true; btn.textContent = '…'; }

  fetch('https://v1.gdapis.com/api/groovemail/saverawuserdetails', {
    method: 'POST',
    mode:   'no-cors',
    body:   new URLSearchParams(new FormData(form))
  }).finally(() => {
    form.style.display = 'none';
    const success = document.getElementById(successId);
    if (success) success.style.display = 'block';
  });
}
