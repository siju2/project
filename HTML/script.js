function showDetails(busNumber, arrival, passengers) {
  document.getElementById("modal-bus-title").textContent = `🚌 ${busNumber}번 버스`;
  document.getElementById("modal-arrival").textContent = arrival;
  document.getElementById("modal-passengers").textContent = passengers;
  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}
