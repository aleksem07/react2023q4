export default function checkPasswordLength() {
  const passwordInput = document.getElementById('password') as HTMLInputElement;

  if (!passwordInput) {
    return;
  }

  const password = passwordInput.value;

  password.length < 3
    ? (passwordInput.style.background = 'red')
    : password.length < 7
    ? (passwordInput.style.background = 'yellow')
    : (passwordInput.style.background = '');
}
