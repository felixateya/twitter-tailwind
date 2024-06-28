import TweetDisplay from "../components/TweetDisplay";
import TweetForm from "../components/TweetForm";
import { useData } from "../hooks/useData";

const Home = () => {
  const{tweetList} = useData()
  return (
    <div className='h-full'>
      <TweetForm />
      {tweetList.map((tweet) => (
        <TweetDisplay key={tweet.tweetId} tweet={tweet}/>
      ))}
    </div>
  );
};

export default Home;
