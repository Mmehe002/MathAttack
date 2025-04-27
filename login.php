<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="login.css">
    <title>Login</title>
</head>
<body>
<div class="back_btn">
    <a href="/project_app/main.html">
        <img src="/project_app/assets/icons/back.svg" alt="back" width="75" height="75">
    </a>
</div>

    <div class="container" id="container">
        <div class="form-container sign-up" id="signUpForm">
            <form method="post" action="register.php">
                <h1>Create Account</h1>
                <span>Use your email</span>
                <input type="text" name="Name" placeholder="Name" required>
                <input type="email" name="Email" placeholder="Email" required>
                <input type="password" name="Password" placeholder="Password" required>
                <input type="submit" class="btn" value="Sign Up" name="signUp">
            </form>
        </div>

        <div class="form-container sign-in" id="signInForm">

           <form method="post" action="register.php">
            <h1>Sign In</h1>
            <span>Enter your email</span>
            <input type="email" name="Email" placeholder="Email" required>
            <input type="password" name="Password" placeholder="Password" required>
            <a href="#">Forgot your password?</a>
            <input type="submit" class="btn" value="Sign In" name="signIn">
        </form>
        </div>
        <div class="toggle-container">
            <div class="toggle">
                <div class="toggle-panel toggle-left">
                    <h1>Welcome Back!</h1>
                    <p>Enter your personal details to use all of site's features</p>
                    <button class="hidden" id="login">Sign In</button>
                </div>
                <div class="toggle-panel toggle-right">
                    <h1>Hello, Friend!</h1>
                    <p>Register with your personal details to use all of site's features</p>
                    <button class="hidden" id="register">Sign Up</button>
                </div>
            </div>
        </div>
    </div>
    <script src="login.js"></script>
</body>
</html>