<?php
include 'connect.php'; // Include DB connection

if(isset($_POST['signUp'])){
    $Name = $_POST['Name'];
    $Email = $_POST['Email'];
    $Password = $_POST['Password'];
    $Password = md5($Password); // Hash password (later use bcrypt ideally)

    $checkEmail = "SELECT * FROM users WHERE Email='$Email'";
    $result = $conn->query($checkEmail);

    if($result->num_rows > 0){
        echo "
        <div style='text-align:center; margin-top:50px;'>
            <h2 style='color:red;'>This Account already exists!</h2>
            <a href='login.php' style='
                display:inline-block;
                margin-top:20px;
                padding:10px 20px;
                background-color:#512da8;
                color:white;
                text-decoration:none;
                border-radius:8px;
                font-weight:bold;
            '>Back to Login</a>
        </div>
        ";
    } else {
        $insertQuery = "INSERT INTO users(Name, Email, Password) VALUES ('$Name', '$Email', '$Password')";
        if($conn->query($insertQuery) === TRUE){
            header("location: login.php");
        } else {
            echo "Error: " . $conn->error;
        }
    }
}

if(isset($_POST['signIn'])){
    $Email = $_POST['Email'];
    $Password = $_POST['Password'];
    $Password = md5($Password);

    $sql = "SELECT * FROM users WHERE Email='$Email' AND Password='$Password'";
    $result = $conn->query($sql);

    if($result->num_rows > 0){
        session_start();
        $row = $result->fetch_assoc();
        $_SESSION['Email'] = $row['Email'];
        header("Location: home.html"); // Redirect to home page after successful login
        exit();
    } else {
        // Making the error message and a button so you can go back with easy navigation 
        // this page is simple as it shouldnt be used for anything else
        echo "
        <div style='text-align:center; margin-top:50px;'>
            <h2 style='color:red;'>Incorrect Email or Password!</h2>
            <a href='login.php' style='
                display:inline-block;
                margin-top:20px;
                padding:10px 20px;
                background-color:#512da8;
                color:white;
                text-decoration:none;
                border-radius:8px;
                font-weight:bold;
            '>Back to Login</a>
        </div>
        ";
    }
}
?>
