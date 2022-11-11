import { useState } from 'react'
import { useRef } from 'react';
import { NFTCard } from "components/nftCard";


const Home = () => {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [pageKey, setPageKey] = useState([]);
  const [totalResults, setTotalResults] = useState([]);
  const [fetchForCollection, setFetchForCollection] = useState(false);
  const ref = useRef(null);
  const api_key = "jC5MBo3QrPka5zENJaDziybE0Wvh5CTZ";
  
  //Let you paginate if more than 100 results are shown
  function getPagination(){
    if (pageKey) {
      return ( <button className={"p-3 m-10 w-80 disabled:bg-slate-500 text-white bg-blue-400 rounded-md bg-gradient-to-r from-green-400 to-blue-500"} 
        onClick={() => {
            !fetchForCollection && fetchNFTs(pageKey);
            fetchForCollection && fetchNFTsForCollection(pageKey);
          }
            }>SHOW ME MORE</button>
          )
    }
  }

  const fetchNFTs = async(pageKey) => {
    console.log("fetching...");
    let nfts;
    console.log("fetching nfts");
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`;

    var requestOptions = {
        method: 'GET'
      };

    if (pageKey) {
      pageKey = `&pageKey=${pageKey}`;
    }else {
      pageKey = "";
    }
     
    if (!collection.length) {
      const fetchURL = `${baseURL}?owner=`.concat(wallet,pageKey);
      console.log(fetchURL);

      nfts = await fetch(fetchURL, requestOptions)
        .then(data => data.json());
    } else {
      console.log("fetching nfts for collection owned by address")
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=`.concat(collection,pageKey);
      nfts = await fetch(fetchURL, requestOptions)
        .then(data => data.json())
    }

    if (nfts) {
      console.log("nfts:", nfts);
      setNFTs(nfts.ownedNfts);
      setPageKey(nfts.pageKey);
      setTotalResults(nfts.totalCount);
      ref.current?.scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
    }
  }

  const fetchNFTsForCollection = async (pageKey) => {
    if (collection.length) {
      var requestOptions = {
        method: 'GET'
      };
      if (pageKey) {
        pageKey = `&pageKey=${pageKey}`;alert(pageKey);
      }else {
        pageKey = "";
      }
      const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`.concat(collection,pageKey);
      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
      if (nfts) {
        console.log("NFTs in collection:", nfts)
        setNFTs(nfts.nfts);
        setPageKey(nfts.pageKey);
        ref.current?.scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
      }
    }
  }
  return (
    <div className="w-full content-center flex flex-col items-center justify-center py-8 gap-y-3 dark:bg-slate-800">
      <div className="flex h-screen flex-col w-full justify-center items-center gap-y-2">
        <div className="w-80 mb-12"><img src="https://ipfs.filebase.io/ipfs/QmT5PoF3Jk7fm3g8odCR6Mfb6YnXqp3PZKCyJq9ztBJtgG/QmWnbxbS4UdWMsST5TJM8Xvg9ipXL9r4ubWCubo7DcE4zm"></img></div>
        <input className="rounded-lg p-3 placeholder:italic placeholder:text-slate-600 w-80 text-[15px]" onChange={(e)=>{setWalletAddress(e.target.value)}} disabled={fetchForCollection} value={wallet} type={"text"} placeholder=" Add your wallet address "></input>
        <input className="rounded-lg p-3 placeholder:italic placeholder:text-slate-600 w-80 my-4 text-[15px]" onChange={(e)=>{setCollectionAddress(e.target.value)}} value={collection} type={"text"} placeholder=" Add the collection address "></input>
        <label className="text-gray-600 w-80 text-left text-[20px]"><input onChange={(e)=>{setFetchForCollection(e.target.checked)}} type={"checkbox"} className="mr-2 "></input><span className="text-white">Fetch for collection</span></label>
        <button className={"p-4 mb-40 w-80 disabled:bg-slate-500 text-white bg-blue-400 rounded-md bg-gradient-to-r from-green-400 to-blue-500"} 
        onClick={() => {
          !fetchForCollection && fetchNFTs();
          fetchForCollection && fetchNFTsForCollection();
        }
          }>SEARCH</button>
      </div>
      <div ref={ref} className="text-white text-xl">{totalResults} NFTs found. Showing {NFTs.length} of them</div>
      <div className='min-h-screen w-full flex flex-wrap gap-y-12 mt-4  gap-x-2 justify-center'>
        {
          NFTs.length > 0 &&
          NFTs.length && NFTs.map(nft => {
            return (
                <NFTCard nft={nft}></NFTCard>
            )
          })
        }
      </div>
      {getPagination(pageKey)}
    </div>
  )
}

export default Home