db.createUser({
  user: "wassim-azirar",
  pwd: "linkedin",
  roles: [
    {
      role: "root",
      db: "mern"
    }
  ]
});
