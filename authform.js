// ✅ Supabase Setup
const SUPABASE_URL = "https://mwadqhdcvehgkrunjmzf.supabase.co"; 
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13YWRxaGRjdmVoZ2tydW5qbXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzODk0MDAsImV4cCI6MjA3NTk2NTQwMH0.gGxtYe_xrlJ0sCAIibtFT_fA4ylWA-RjaSz69U74giw";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

console.log("✅ Supabase connected");

// ✅ SIGNUP Function
async function signup() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const contact = document.getElementById("contact").value;
  const work = document.getElementById("work").value;
  const avatar = document.getElementById("avatar")?.value || ""; // optional

  const msg = document.getElementById("signupMessage");
  msg.textContent = "Creating account...";

  // 1️⃣ Signup user
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
  });

  if (error) {
    msg.style.color = "red";
    msg.textContent = error.message;
    return;
  }

  // 2️⃣ Save profile data in 'profiles' table
  const user = data.user;
  const { error: insertError } = await supabaseClient.from("profiles").insert([
    {
      id: user.id,
      name: name,
      contact: contact,
      work: work,
      avatar_url: avatar,
    },
  ]);

  if (insertError) {
    msg.style.color = "red";
    msg.textContent = "Signup success but profile save failed: " + insertError.message;
  } else {
    msg.style.color = "green";
    msg.textContent = "Signup successful! Check your email for verification.";
  }
}

// ✅ LOGIN Function
async function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const msg = document.getElementById("loginMessage");

  msg.textContent = "Logging in...";

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    msg.style.color = "red";
    msg.textContent = error.message;
  } else {
    msg.style.color = "green";
    msg.textContent = "Login successful!";
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1200);
  }
}

// ✅ SHOW USER PROFILE (for index.html header)
async function showUserProfile() {
  const { data: { user } } = await supabaseClient.auth.getUser();
  const userInfoDiv = document.getElementById("user-info");
  const avatarImg = document.getElementById("user-avatar");
  const userName = document.getElementById("user-name");

  if (!user) {
    // Not logged in
    userInfoDiv.style.display = "none";
    return;
  }

  // Fetch user profile
  const { data: profile, error } = await supabaseClient
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Profile fetch error:", error.message);
    return;
  }

  userInfoDiv.style.display = "flex";
  userName.textContent = profile.name || "User";
  
  if (profile.avatar_url) {
    avatarImg.src = profile.avatar_url;
    avatarImg.style.display = "block";
  } else {
    avatarImg.style.display = "none";
  }
}

// ✅ LOGOUT Function
async function logout() {
  await supabaseClient.auth.signOut();
  alert("Logged out successfully!");
  window.location.href = "login.html";
}
