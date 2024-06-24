import TweetDisplay from "../components/TweetDisplay";
import TweetForm from "../components/TweetForm";

const Home = () => {
  const arr = [1, 2];
  return (
    <div>
      <TweetForm />
      {arr.map((num) => (
        <TweetDisplay key={num} />
      ))}
    </div>
  );
};

export default Home;
