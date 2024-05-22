export async function authLoader() {
  const storedToken = localStorage.getItem("token");
  if (!storedToken) {
    return { isAuth: false };
  }
  try {
    const response = await fetch("http://localhost:8080/auth/check-token", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${storedToken.slice(1, storedToken.length - 1)}`,
      },
    });
    if (response.ok) {
      return { isAuth: true };
    } else {
      if (response.status === 403) {
        localStorage.removeItem("token");
        return { isAuth: false };
      } else {
        return { isAuth: false };
      }
    }
  } catch (error) {
    return { isAuth: false };
  }
}

export async function agentsLoader() {
  try {
    const response = await fetch("http://localhost:8080/api/agents", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const agents = await response.json();
      return { agents };
    } else {
      return { agents: [] };
    }
  } catch (error) {
    return { agents: [] };
  }
}

export async function clientsLoader() {
  try {
    const response = await fetch("http://localhost:8080/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const clients = await response.json();
      return { clients };
    } else {
      return { clients: [] };
    }
  } catch (error) {
    return { clients: [] };
  }
}

export async function feedbacksLoader() {
  try {
    const response = await fetch("http://localhost:8080/api/feedbacks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const feedbacks = await response.json();
      return { feedbacks };
    } else {
      return { feedbacks: [] };
    }
  } catch (error) {
    return { feedbacks: [] };
  }
}

export async function usersIdsLoader() {
  try {
    const response = await fetch("http://localhost:8080/api/users/ids", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const usersIds = await response.json();
      return { usersIds };
    } else {
      return { usersIds: [] };
    }
  } catch (error) {
    return { usersIds: [] };
  }
}

export async function adminFeedbacksLoader() {
  try {
    const { feedbacks } = await feedbacksLoader();
    const { usersIds } = await usersIdsLoader();
    return { usersIds, feedbacks };
  } catch (error) {
    return { usersIds: [], feedbacks: [] };
  }
}

export async function realEstatesWithUserLoader() {
  try {
    const response = await fetch(
      "http://localhost:8080/api/realEstates/withUserDetails",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const realEstates = await response.json();
      return { realEstates };
    } else {
      return { realEstates: [] };
    }
  } catch (error) {
    return { realEstates: [] };
  }
}

export async function adminRealEstatesLoader() {
  try {
    const { realEstates } = await realEstatesWithUserLoader();
    const { usersIds } = await usersIdsLoader();
    return { usersIds, realEstates };
  } catch (error) {
    return { usersIds: [], realEstates: [] };
  }
}

export async function detailedRealEstateLoader({
  params,
}: {
  params: { realEstateId?: number };
}) {
  try {
    const response = await fetch(
      `http://localhost:8080/api/realEstates/withUserDetails/${
        params.realEstateId || -1
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const realEstate = await response.json();
      return { realEstate };
    } else {
      return { realEstate: null };
    }
  } catch (error) {
    return { realEstate: null };
  }
}

export async function contractsLoader() {
  try {
    const response = await fetch("http://localhost:8080/api/contracts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const contracts = await response.json();
      return { contracts };
    } else {
      return { contracts: [] };
    }
  } catch (error) {
    return { contracts: [] };
  }
}

export async function transactionsLoader() {
  try {
    const response = await fetch("http://localhost:8080/api/transactions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const transactions = await response.json();
      return { transactions };
    } else {
      return { transactions: [] };
    }
  } catch (error) {
    return { transactions: [] };
  }
}

export async function adminTableCountsLoader() {
  try {
    const response = await fetch("http://localhost:8080/api/adminTableCounts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const counts = await response.json();
      return { counts };
    } else {
      return { counts: [] };
    }
  } catch (error) {
    return { counts: [] };
  }
}

export async function lastTransactionsLoader() {
  try {
    const response = await fetch(
      "http://localhost:8080/api/transactions/latest/5",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const transactions = await response.json();
      return { transactions };
    } else {
      return { transactions: [] };
    }
  } catch (error) {
    return { transactions: [] };
  }
}

export async function lastContractsLoader() {
  try {
    const response = await fetch(
      "http://localhost:8080/api/contracts/latest/5",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const contracts = await response.json();
      return { contracts };
    } else {
      return { contracts: [] };
    }
  } catch (error) {
    return { contracts: [] };
  }
}

export async function adminHomeLoader() {
  try {
    const { counts } = await adminTableCountsLoader();
    const { transactions } = await lastTransactionsLoader();
    const { contracts } = await lastContractsLoader();
    return {
      counts,
      transactions,
      contracts,
    };
  } catch (error) {
    return {
      counts: [],
      transactions: [],
      contracts: [],
    };
  }
}

export async function lastRealEstatesLoader() {
  try {
    const response = await fetch(
      "http://localhost:8080/api/realEstates/latest/7",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const realEstates = await response.json();
      return { realEstates };
    } else {
      return { realEstates: [] };
    }
  } catch (error) {
    return { realEstates: [] };
  }
}

export async function bestFeedbacksLoader() {
  const storedToken = localStorage.getItem("token");
  if (!storedToken) {
    return { feedbacks: [] };
  }
  try {
    const response = await fetch("http://localhost:8080/api/feedbacks/bests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: storedToken.slice(1, storedToken.length - 1),
        limit: 3,
      }),
    });
    if (response.ok) {
      const feedbacks = await response.json();
      return { feedbacks };
    } else {
      return { feedbacks: [] };
    }
  } catch (error) {
    return { feedbacks: [] };
  }
}

export async function homeLoader() {
  try {
    const { counts } = await adminTableCountsLoader();
    const { realEstates } = await lastRealEstatesLoader();
    const { feedbacks } = await bestFeedbacksLoader();
    return {
      counts,
      realEstates,
      feedbacks,
    };
  } catch (error) {
    return {
      counts: [],
      realEstates: [],
      feedbacks: [],
    };
  }
}

export async function feedbacksWithUserLoader() {
  const storedToken = localStorage.getItem("token");
  if (!storedToken) {
    return { feedbacks: [] };
  }
  try {
    const response = await fetch(
      "http://localhost:8080/api/feedbacks/withUser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: storedToken.slice(1, storedToken.length - 1),
        }),
      }
    );
    if (response.ok) {
      const feedbacks = await response.json();
      return { feedbacks };
    } else {
      return { feedbacks: [] };
    }
  } catch (error) {
    return { feedbacks: [] };
  }
}

export async function userLimitedFeedbacksLoader() {
  const storedToken = localStorage.getItem("token");
  if (!storedToken) {
    return { userFeedbacks: [] };
  }
  try {
    const response = await fetch(`http://localhost:8080/api/feedbacks/lme`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: storedToken.slice(1, storedToken.length - 1),
        limit: 3,
      }),
    });

    if (response.ok) {
      const userFeedbacks = await response.json();
      return { userFeedbacks: userFeedbacks };
    } else {
      return { userFeedbacks: [] };
    }
  } catch (error) {
    return { userFeedbacks: [] };
  }
}

export async function userFeedbacksLoader() {
  const storedToken = localStorage.getItem("token");
  if (!storedToken) {
    return { userFeedbacks: [] };
  }
  try {
    const response = await fetch(`http://localhost:8080/api/feedbacks/me`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: storedToken.slice(1, storedToken.length - 1),
      }),
    });

    if (response.ok) {
      const userFeedbacks = await response.json();
      return { userFeedbacks: userFeedbacks };
    } else {
      return { userFeedbacks: [] };
    }
  } catch (error) {
    return { userFeedbacks: [] };
  }
}

export async function miniFeedbacksLoader() {
  try {
    const response = await fetch(
      "http://localhost:8080/api/feedbacks/idsAndRates",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const feedbacks = await response.json();
      return { feedbacks };
    } else {
      return { feedbacks: [] };
    }
  } catch (error) {
    return { feedbacks: [] };
  }
}

export async function feedbackLoader() {
  try {
    const { userFeedbacks } = await userLimitedFeedbacksLoader();
    const { feedbacks: topUsersFeedbacks } = await bestFeedbacksLoader();
    const { feedbacks: feedbacks } = await miniFeedbacksLoader();
    return {
      userFeedbacks,
      topUsersFeedbacks,
      feedbacks,
    };
  } catch (error) {
    return {
      userFeedbacks: [],
      topUsersFeedbacks: [],
      feedbacks: [],
    };
  }
}

export async function dashboardLoader() {
  const storedToken = localStorage.getItem("token");
  if (!storedToken) {
    return { realEstates: [] };
  }
  try {
    const response = await fetch(`http://localhost:8080/api/realEstates/me`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: storedToken.slice(1, storedToken.length - 1),
      }),
    });

    if (response.ok) {
      const realEstates = await response.json();
      return { realEstates };
    } else {
      return { realEstates: [] };
    }
  } catch (error) {
    return { realEstates: [] };
  }
}

export async function detailedBuyedLoader({
  params,
}: {
  params: { realEstateId?: number };
}) {
  try {
    const { realEstate } = await detailedRealEstateLoader({ params });
    const { agents } = await agentsLoader();
    const { transactions } = await transactionsLoader();
    return {
      realEstate,
      agents,
      transactions,
    };
  } catch (error) {
    return {
      realEstate: null,
      agents: [],
      transactions: [],
    };
  }
}
