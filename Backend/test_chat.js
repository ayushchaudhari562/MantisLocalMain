async function testChat() {
  const res = await fetch('http://localhost:5000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      productId: 'd3e97adf-eedb-413b-a2bb-9f450aa29c1e',
      message: 'My horn is broken'
    })
  });
  const data = await res.json();
  console.log(data);
}
testChat();
