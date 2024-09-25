

    const assistantTab = document.getElementById("Donation");
    const historyTab = document.getElementById("History");

    assistantTab.addEventListener("click", function () {
      assistantTab.classList.add("text-black", "bg-lime-400");
      historyTab.classList.remove("bg-lime-400");
      historyTab.classList.add("text-black");
      document.getElementById("history-section").classList.add("hidden");
      document.getElementById("expense-from").classList.remove("hidden");
    });

    historyTab.addEventListener("click", function () {
      historyTab.classList.add("text-black", "bg-lime-400");
      assistantTab.classList.remove("bg-lime-400");
      assistantTab.classList.add("text-black");
      document.getElementById("history-section").classList.remove("hidden");
      document.getElementById("expense-from").classList.add("hidden");
    });

    const donationButtons = document.querySelectorAll(".donate-btn");
    const totalAmountEl = document.getElementById("amont");
    const historyList = document.getElementById("history-list");

    donationButtons.forEach(button => {
      button.addEventListener("click", function () {
        const donationCard = button.closest(".donation-card");
        const amountInput = donationCard.querySelector(".amount-input");
        const expenseAmountEl = donationCard.querySelector(".amount-expens");
        const modal = donationCard.querySelector("dialog");

        const eventName = donationCard.querySelector(".event_name").innerText;

        const amount = Number(amountInput.value);
        let totalAmount = Number(totalAmountEl.innerText);
        let expenseAmount = Number(expenseAmountEl.innerText);

        if (amount <= 0 || isNaN(amount)) {
          alert("Please enter a valid donation amount.");
          return;
        }

        if (amount > totalAmount) {
          alert("Not enough funds.");
          return;
        }

        expenseAmount += amount;
        totalAmount -= amount;

        totalAmountEl.innerText = totalAmount;
        expenseAmountEl.innerText = expenseAmount;

        modal.showModal();

        const totalExpenses = expenseAmount;
        const historySection = document.createElement("div");
        historySection.className = 'bg-white p-3 rounded-md border-l-2 border-indigo-500';
        historySection.innerHTML = `
          <p class="text-xs text-gray-500 ">${new Date()}</p>
          <p class="text-xs text-gray-500 ">${totalExpenses.toFixed(2)} Taka is Donated for famine-2024 at ${eventName}, Bangladesh</p>
        `;
        
        historyList.appendChild(historySection);

        amountInput.value = "";

        const closeButton = modal.querySelector(".btn");
        closeButton.addEventListener("click", function () {
          modal.close();
        });
      });
    });

  