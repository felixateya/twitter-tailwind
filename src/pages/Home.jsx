import TweetDisplay from "../components/TweetDisplay";
import TweetForm from "../components/TweetForm";
import { useData } from "../hooks/useData";
import { MiniLoader } from "../components/MiniLoader";

const Home = () => {
  const { tweetList, error } = useData();

  return (
    <div className="h-full">
      <TweetForm />
      {!tweetList && !error && <MiniLoader />}
      {error && <h3 className="text-red-500 text-2xl">{error}</h3>}
      {tweetList.map((mytweet) => (
        <TweetDisplay key={mytweet.tweetId} tweet={mytweet} />
      ))}
    </div>
  );
};

export default Home;
