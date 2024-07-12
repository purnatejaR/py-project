import axios from 'axios';

const Feedback = () => {
    const [userId, setUserId] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleSubmitFeedback = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/feedback', { user_id: userId, feedback });
            if (response.status === 201) {
                alert('Feedback submitted successfully!');
                setUserId('');
                setFeedback('');
            }
        } catch (error) {
            console.error('Error submitting feedback', error);
        }
    };

    return (
        <div className="container">
            <h2>Feedback</h2>
            <form onSubmit={handleSubmitFeedback}>
                <div>
                    <label>User ID:</label>
                    <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />
                </div>
                <div>
                    <label>Feedback:</label>
                    <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} required></textarea>
                </div>
                <button type="submit">Submit Feedback</button>
            </form>
        </div>
    );
};

export default Feedback;
