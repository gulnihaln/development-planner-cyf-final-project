export const getFeedbacks = async () => {
    return [
        {
          "feedbackId": "1",
          "description": "this is the first feedback",
          "username": "Ali",
          "userId": "1",
          "parentId": null,
          "createdAt": "2021-08-16T23:00:33.010+02:00",
        },
        {
          "feedbackId": "2",
          "description": "this is the second feedback",
          "username": "Mo",
          "userId": "2",
          "parentId": null,
          "createdAt": "2021-08-16T23:00:33.010+02:00",
        },
        {
          "feedbackId": "3",
          "description": "this is the first reply",
          "username": "Mo",
          "userId": "2",
          "parentId": "1",
          "createdAt": "2021-08-16T23:00:33.010+02:00",
        },
        {
          "feedbackId": "4",
          "description": "this is the second reply",
          "username": "Mo",
          "userId": "2",
          "parentId": "2",
          "createdAt": "2021-08-16T23:00:33.010+02:00",
        },
      ];
  };

  export const createFeedback = async (text, parentId = null) => {
    return {
      feedbackId: Math.random().toString(36).substr(2, 9),
      description: text,
      parentId,
      userId: "1",
      username: "Ali",
      createdAt: new Date().toISOString(),
    };
  };

  export const updateFeedback = async (text) => {
    return { text };
  };

  export const deleteFeedback = async () => {
    return {};
  };