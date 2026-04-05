export default function SendNotifications() {
  return (
    
    <form
  onSubmit={async e => {
    e.preventDefault();
    const title = e.currentTarget.title.value;
    const body = e.currentTarget.body.value;

    await fetch("/api/send-notifications", {
      method: "POST",
      body: JSON.stringify({ title, body }),
      headers: { "Content-Type": "application/json" },
    });

    alert("Notifications envoyées !");
  }}
>
  <input name="title" placeholder="Titre" />
  <textarea name="body" placeholder="Message" />
  <button type="submit">Envoyer</button>
</form>
    
    )
}

