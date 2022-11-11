import {CopyToClipboard} from 'react-copy-to-clipboard';
import truncateEthAddress from 'truncate-eth-address'
import Tooltip from '@mui/material/Tooltip';

export const NFTCard = ({ nft }) => {
    if (nft.title){
    return (
        <div className="w-1/4 flex flex-col dark:bg-slate-800 border-slate-400 border-2 rounded-md">
            <div className="rounded-md" key="{nft.title}/{nft.id.tokenId}">
                <img className="object-cover h-128 w-full rounded-t-md" src={nft.media[0].gateway} ></img>
            </div>
            <div className="flex flex-col y-gap-2 px-2 py-3 rounded-b-md h-110 bg-slate-700">
                <div className="text-black">
                    <h2 className="text-xl mb-6 text-white font-semibold">{nft.title}</h2>
                    <div className="bg-slate-200 rounded-md p-2">
                        <div className="inline font-semibold">Token Id: </div>
                        <div className="italic inline">${truncateEthAddress(nft.id.tokenId)}</div>
                    </div>
                    <div className="my-6 bg-slate-200 rounded-md p-2">
                        <span className="font-semibold">Collection address: </span>
                        <CopyToClipboard text={nft.contract.address}>
                            <div className="italic inline">
                                ${truncateEthAddress(nft.contract.address)}&nbsp;
                                <Tooltip title="Copy to clipboard" placement="right" arrow>
                                <img className="pb-1 cursor-pointer w-4 inline align-middle" src="https://ipfs.filebase.io/ipfs/QmVHXgcYpna4ua4pHcTEd8G4zJTFtCsw3y89pfn2PJPmKV/Qmd5Sio842NBrZt9811BmqZFuvMPGpdpHPr892hkrPxm7M"></img>
                                </Tooltip>
                            </div>
                        </CopyToClipboard>
                    </div>
                </div>

                <div className="flex-grow mt-2 text-black bg-slate-200 rounded-md p-2">
                    <div>
                        <div className="font-semibold">Description:</div>
                        <div className="italic">{nft.description}</div>
                    </div>
                </div>
            </div>
        </div>
    )
    }
}