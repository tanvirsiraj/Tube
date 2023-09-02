const findCategory = async (category_name) => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  console.log(data.data);
  data.data.forEach((category) => {
    if (category_name === category.category) {
      //   console.log(category.category_id);
      loadData(category.category_id);
    }
  });
};
const loadData = async (id) => {
  console.log(id);
  const res = await fetch(
    ` https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
  //   console.log(data.data);
  displayData(data.data);
};

const displayData = (data) => {
  console.log(data);

  const container = document.getElementById("card-container");
  container.innerHTML = "";

  console.log(container);
  data.forEach((singleData) => {
    const tubeCard = document.createElement("div");
    tubeCard.classList = `card  bg-white`;
    tubeCard.innerHTML = ` 
   
      <img
      class="rounded"
      style="width:312px;height:200px;"
        src="${singleData.thumbnail}"
        alt="Shoes"
      />
   
    <div class="">
    <div class="flex  items-start gap-4 my-6">
      <img 
      class="rounded-full"
      style="width:40px;height:40px;"
      src="${singleData.authors[0].profile_picture}"
      alt="Shoes"
    />
    <div class="space-y-1">
    <h2 class="text-[#171717] font-bold text-base">${singleData.title}</h2>
    <div class="flex  items-center gap-2">
    <p class="text-[#171717B3] text-sm">Awlad Hossain</p>
    <img 
    
    src="./img/verified.png"
    alt="Shoes"
  />
  </div>
  <p class="text-[#171717B3] text-sm ">${singleData.others.views} views</p>
    </div>
     
    </div>
   
    </div>
 `;

    container.appendChild(tubeCard);
  });
};

const tabs = document.querySelectorAll(".tab");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((tab) => tab.classList.remove("tab-active"));
    tab.classList.add("tab-active");
    findCategory(tab.innerText);
  });
  if (tab.innerText === "All") {
    findCategory(tab.innerText);
  }
});
