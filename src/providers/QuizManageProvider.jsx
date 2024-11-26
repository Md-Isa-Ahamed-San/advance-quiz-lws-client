
/* eslint-disable react/prop-types */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QuizManageContext } from '../contexts';
import useAxios from '../hooks/useAxios';

const QuizManageProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const { api } = useAxios();

  // Fetch all quiz sets with optional pagination
  const fetchQuizSets = async ({ page = 1, limit = 10 } = {}) => {
    try {
      const { data } = await api.get(`/quizzes?page=${page}&limit=${limit}`);
      return data;
    } catch (error) {
      throw new Error('Failed to fetch quiz sets');
    }
  };

  const useFetchQuizSets = ({ page = 1, limit = 10 } = {}) =>
    useQuery({
      queryKey: ['quizSets', { page, limit }],
      queryFn: () => fetchQuizSets({ page, limit }),
      keepPreviousData: true, // Ensures smooth pagination transitions
      onError: (error) => {
        console.error('Error fetching quiz sets:', error);
      },
    });

  // Fetch one quiz by ID
  const fetchQuiz = async (quizSetId) => {
    try {
      const { data } = await api.get(`/quizzes/${quizSetId}`);
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch quiz with ID ${quizSetId}`);
    }
  };

  const useFetchQuiz = (quizSetId) =>
    useQuery({
      queryKey: ['quizSets', quizSetId],
      queryFn: () => fetchQuiz(quizSetId),
      onError: (error) => {
        console.error(`Error fetching quiz with ID ${quizSetId}:`, error);
      },
    });

  // Fetch a specific question
  const fetchQuestion = async ({ quizSetId, questionId }) => {
    try {
      const { data } = await api.get(`/quizzes/${quizSetId}/questions/${questionId}`);
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch question ID ${questionId} from quiz set ID ${quizSetId}`);
    }
  };

  const useFetchQuestion = ({ quizSetId, questionId }) =>
    useQuery({
      queryKey: ['quizSets', quizSetId, 'questions', questionId],
      queryFn: () => fetchQuestion({ quizSetId, questionId }),
      onError: (error) => {
        console.error(`Error fetching question ${questionId}:`, error);
      },
    });

  // Create a new quiz set
  const createQuizSet = async (data) => {
    try {
      const { data: responseData } = await api.post('/create-quiz-set', data);
      return responseData;
    } catch (error) {
      throw new Error('Failed to create a new quiz set');
    }
  };

  const useCreateQuizSet = () =>
    useMutation({
      mutationFn: createQuizSet,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['quizSets'] });
      },
      onError: (error) => {
        console.error('Failed to create quiz set:', error);
      },
    });

  // Add a question to a quiz set
  const addQuestion = async ({ quizSetId, question }) => {
    try {
      const { data } = await api.post(`/quizzes/${quizSetId}/add-question`, question);
      return data;
    } catch (error) {
      throw new Error(`Failed to add a question to quiz set ID ${quizSetId}`);
    }
  };

  const useAddQuestion = () =>
    useMutation({
      mutationFn: addQuestion,
      onSuccess: (_, { quizSetId }) => {
        queryClient.invalidateQueries({ queryKey: ['quizSets', quizSetId] });
      },
      onError: (error) => {
        console.error('Failed to add question:', error);
      },
    });

  // Update a question
  const patchUpdateQuestion = async ({ questionId, updatedData }) => {
    try {
      const { data } = await api.patch(`/admin/questions/${questionId}`, updatedData);
      return data;
    } catch (error) {
      throw new Error(`Failed to update question ID ${questionId}`);
    }
  };

  const usePatchUpdateQuestion = () =>
    useMutation({
      mutationFn: patchUpdateQuestion,
      onSuccess: (_, { quizSetId }) => {
        queryClient.invalidateQueries({ queryKey: ['quizSets', quizSetId] });
      },
      onError: (error) => {
        console.error('Failed to update question:', error);
      },
    });

  // Delete a question
  const deleteQuestion = async ({ quizSetId, questionId }) => {
    try {
      const { data } = await api.delete(`/quizzes/${quizSetId}/questions/${questionId}`);
      return data;
    } catch (error) {
      throw new Error(`Failed to delete question ID ${questionId} from quiz set ID ${quizSetId}`);
    }
  };

  const useDeleteQuestion = () =>
    useMutation({
      mutationFn: deleteQuestion,
      onSuccess: (_, { quizSetId }) => {
        queryClient.invalidateQueries({ queryKey: ['quizSets', quizSetId] });
      },
      onError: (error) => {
        console.error('Failed to delete question:', error);
      },
    });

  // Publish and unpublish quiz sets
  const publishQuizSet = async ({ quizSetId }) => {
    try {
      const { data } = await api.put(`/quizzes/${quizSetId}/publish`);
      return data;
    } catch (error) {
      throw new Error(`Failed to publish quiz set ID ${quizSetId}`);
    }
  };

  const usePublishQuizSet = () =>
    useMutation({
      mutationFn: publishQuizSet,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['quizSets'] });
      },
      onError: (error) => {
        console.error('Failed to publish quiz set:', error);
      },
    });

  const unpublishQuizSet = async ({ quizSetId }) => {
    try {
      const { data } = await api.put(`/quizzes/${quizSetId}/unpublish`);
      return data;
    } catch (error) {
      throw new Error(`Failed to unpublish quiz set ID ${quizSetId}`);
    }
  };

  const useUnpublishQuizSet = () =>
    useMutation({
      mutationFn: unpublishQuizSet,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['quizSets'] });
      },
      onError: (error) => {
        console.error('Failed to unpublish quiz set:', error);
      },
    });

  // Context value
  const value = {
    useFetchQuiz,
    useFetchQuizSets,
    useCreateQuizSet,
    useAddQuestion,
    useFetchQuestion,
    usePatchUpdateQuestion,
    useDeleteQuestion,
    usePublishQuizSet,
    useUnpublishQuizSet,
  };

  return (
    <QuizManageContext.Provider value={value}>
      {children}
    </QuizManageContext.Provider>
  );
};

export default QuizManageProvider;
