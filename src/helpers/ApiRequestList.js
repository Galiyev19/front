export const getCitiesList = async () => {
  const url = "/api/cities/";
  const username = "admin";
  const password = "admin";

  // console.log("Basic " + btoa(username + ":" + password));

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Basic " + btoa(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
    },
  });

  const result = await response.json();
  return result;
};



export const getDepartmentList = async () => {
  const url = "/api/departments/";
  const username = "admin";
  const password = "admin";

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Basic " + btoa(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
    },
  });

  const result = await response.json();
  return result;
};


export const getDepartmentById = async (id) => {
  const url = "api/departments/"
  const username = 'admin'
  const password = 'admin'

  const response = await fetch(url + id, {
    headers: {
      Authorization: "Basic " + btoa(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
    },
    method: "GET"
  })

  const result = await response.json()
  return result;
}

export const getExamDateById = async (id) => {
  const username = "admin";
  const password = "admin";

  const response = await fetch(`/api/exams/${id}`, {
    method: "GET",
    headers: {
      Authorization: "Basic " + btoa(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
    },
  });

  const result = await response.json();
  return result;
};

export const getFreeExamPractice = async (id, categoryName, kpp) => {
  const username = "admin";
  const password = "admin";

  const obj = {
    department_id: id,
    category: categoryName,
    kpp: kpp,
  };
  console.log(test);

  fetch(`/api/practice/free/exams/`, {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(username + ":" + password),
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
    },
    body: JSON.stringify(obj),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Request failed with status code ${response.status}`);
      }
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch(function (res) {
      console.log(res);
    });
};

export const getUserByAppNumber = async (id) => {
  const url = "/api/search/applicant/";
  const username = "admin";
  const password = "admin";

  const response = await fetch(url + id, {
    headers: {
      Authorization: "Basic " + btoa(username + ":" + password),
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
    },
    method: "GET",
  });

  const result = response.json();

  if (!response.ok) {
    throw new Error(`Request failed with status code ${response.status}`);
  }

  return result;
};

export const verifyUserByIIN =  async (iin) => {
  const url = ""
  const username = "admin"
  const password = "admin"

  const respoonse = await fetch(url + iin, {
    header: {

    },
    method: "GET"
  })
}
