let categoryId;

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
  const container2 = document.getElementById("empty-container");
  container.innerHTML = "";

  //   console.log(container);
  if (Array.isArray(data) && data.length === 0) {
    container2.style.display = "block";
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="card">
        <figure>
            <img style="height:140px;width:140px;"
                    src="./img/Icon.png" />
        </figure>
        <div class="card-body items-center text-center">
        <h2 class="text-center text-[#171717] font-bold text-xl">Oops!! Sorry, There is no </br> content here</h2>

  </div>
</div>

    `;
    container2.appendChild(card);
  } else {
    container2.style.display = "none";

    data.forEach((singleData) => {
      const tubeCard = document.createElement("div");

      const seconds = singleData.others.posted_date;
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);

      const time = document.createElement("div");
      time.classList = `bg-[#171717] text-white p-2 absolute right-4 md:right-12 lg:right-4 top-36 rounded`;
      if (seconds != "") {
        time.innerHTML = `
        ${hours}hrs ${minutes} min ago
        `;
      } else {
        time.style.display = "none";
      }

      let verified = singleData.authors.verified;

      tubeCard.classList = `card bg-white`;
      tubeCard.innerHTML = `
        <figure  class="rounded relative">
            <img
            class="rounded"
            style="width:312px;height:200px;"
              src="${singleData.thumbnail}"
              alt="Shoes"
            />
        </figure>
          <div class="card-body lg:p-0 lg:my-6">
          <div class="flex items-start gap-4 ">
            <img
            class="rounded-full"
            style="width:40px;height:40px;"
            src="${singleData.authors[0].profile_picture}"
            alt="Shoes"
          />
          <div class="space-y-1">
          <h2 class="text-[#171717] font-bold text-base">${
            singleData.title
          }</h2>
          <div class="flex  items-center gap-2">
          <p class="text-[#171717B3] text-sm">${
            singleData.authors[0].profile_name
          }</p>
          ${
            singleData.authors[0].verified
              ? '<img src="./img/verified.png" alt="Shoes" />'
              : ""
          }
        </div>
        <p class="text-[#171717B3] text-sm ">${
          singleData.others.views
        } views</p>
          </div>

          </div>

          </div>
       `;
      tubeCard.appendChild(time);
      container.appendChild(tubeCard);
    });
  }
};

const tabs = document.querySelectorAll(".tab");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((tab) => tab.classList.remove("tab-active"));
    tab.classList.add("tab-active");
    findCategory(tab.innerText);
    categoryId = tab.innerText;
  });
  if (tab.innerText === "All") {
    findCategory(tab.innerText);
    categoryId = tab.innerText;
  }
});

const findCategoryForSort = async (category_name) => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  console.log(data.data);
  data.data.forEach((category) => {
    if (category_name === category.category) {
      //   console.log(category.category_id);
      loadDataForSort(category.category_id);
    }
  });
};

const loadDataForSort = async (id) => {
  console.log(id);
  const res = await fetch(
    ` https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
  console.log(data.data);
  let dataForSort = data.data;
  dataForSort.sort((a, b) => {
    return (
      parseFloat(b.others.views.slice(0, -1)) -
      parseFloat(a.others.views.slice(0, -1))
    );
  });
  console.log(dataForSort);
  displayData(dataForSort);
};
const sortByView = () => {
  // console.log(categoryId);
  findCategoryForSort(categoryId);
};
