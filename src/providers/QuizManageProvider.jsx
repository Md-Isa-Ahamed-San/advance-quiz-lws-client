import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QuizManageContext } from '../contexts';
import useAxios from '../hooks/useAxios';

const QuizManageProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const { api } = useAxios();

  // Fetch all quiz sets
  const fetchQuizSets = async () => {
    const { data } = await api.get('/quizzes');
    return data;
  };

  const useFetchQuizSets = () =>
    useQuery({
      queryKey: ['quizSets'],
      queryFn: fetchQuizSets,
      select: (data) => data, // Optional transformation if needed like if i want to get only specific part of the data 
    });

  // Create a new quiz set
  const createQuizSet = async (data) => {
    const { data: responseData } = await api.post('/create-quiz-set', data);
    return responseData;
  };

  const useCreateQuizSet = () =>
    useMutation({
      mutationFn: createQuizSet,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['quizSets'] });
      },
    });

  // Add a question to a quiz set
  const addQuestion = async ({ quizSetId, question }) => {
    const { data } = await api.post(`/quizzes/${quizSetId}/add-question`, question);
    return data;
  };

  const useAddQuestion = () =>
    useMutation({
      mutationFn: addQuestion,
      onSuccess: (_, { quizSetId }) => {
        queryClient.invalidateQueries({ queryKey: ['quizSets', quizSetId] });
      },
    });

  // Update a question
  const updateQuestion = async ({ quizSetId, questionId, updatedData }) => {
    const { data } = await api.put(`/quizzes/${quizSetId}/questions/${questionId}`, updatedData);
    return data;
  };

  const useUpdateQuestion = () =>
    useMutation({
      mutationFn: updateQuestion,
      onSuccess: (_, { quizSetId }) => {
        queryClient.invalidateQueries({ queryKey: ['quizSets', quizSetId] });
      },
    });

  // Delete a question
  const deleteQuestion = async ({ quizSetId, questionId }) => {
    const { data } = await api.delete(`/quizzes/${quizSetId}/questions/${questionId}`);
    return data;
  };

  const useDeleteQuestion = () =>
    useMutation({
      mutationFn: deleteQuestion,
      onSuccess: (_, { quizSetId }) => {
        queryClient.invalidateQueries({ queryKey: ['quizSets', quizSetId] });
      },
    });

  // Publish a quiz set
  const publishQuizSet = async ({ quizSetId }) => {
    const { data } = await api.put(`/quizzes/${quizSetId}/publish`);
    return data;
  };

  const usePublishQuizSet = () =>
    useMutation({
      mutationFn: publishQuizSet,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['quizSets'] });
      },
    });

  // Unpublish a quiz set
  const unpublishQuizSet = async ({ quizSetId }) => {
    const { data } = await api.put(`/quizzes/${quizSetId}/unpublish`);
    return data;
  };

  const useUnpublishQuizSet = () =>
    useMutation({
      mutationFn: unpublishQuizSet,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['quizSets'] });
      },
    });

  // Context value
  const value = {
    useFetchQuizSets,
    useCreateQuizSet,
    useAddQuestion,
    useUpdateQuestion,
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
