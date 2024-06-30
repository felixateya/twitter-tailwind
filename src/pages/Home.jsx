import TweetDisplay from "../components/TweetDisplay";
import TweetForm from "../components/TweetForm";
import { useData } from "../hooks/useData";
import { MiniLoader } from "../components/MiniLoader";

const Home = () => {
  const{tweetList} = useData()
  return (
    <div className='h-full'>
      <TweetForm />
        {!tweetList && <MiniLoader/>}
      {tweetList.map((tweet) => (

        <TweetDisplay key={tweet.tweetId} tweet={tweet}/>
      ))}
        
    </div>
  );
};

export default Home;
