// import React from 'react'
// import {render} from 'react-dom'
// import {InstantSearch, Highlight} from 'react-instantsearch/dom'
// import {connectAutoComplete} from 'react-instantsearch/connectors'
// import Autocomplete from 'downshift'

// function RawAutoComplete({refine, hits}) {
//   return (
//     <Autocomplete
//       itemToString={i => (i ? i.name : i)}
//       onChange={item => alert(JSON.stringify(item))}
//     >
//       {({
//         getInputProps,
//         getItemProps,
//         selectedItem,
//         highlightedIndex,
//         isOpen,
//       }) =>
//         <div>
//           <input
//             {...getInputProps({
//               onChange(e) {
//                 refine(e.target.value)
//               },
//             })}
//           />
//           {isOpen &&
//             <div>
//               {hits.map((item, index) =>
//                 <div
//                   key={item.objectID}
//                   {...getItemProps({
//                     item,
//                     index,
//                     style: {
//                       backgroundColor:
//                         highlightedIndex === index ? 'gray' : 'white',
//                       fontWeight: selectedItem === item ? 'bold' : 'normal',
//                     },
//                   })}
//                 >
//                   <Highlight attributeName="name" hit={item} tagName="mark" />
//                 </div>,
//               )}
//             </div>}
//         </div>}
//     </Autocomplete>
//   )
// }

// const AutoCompleteWithData = connectAutoComplete(RawAutoComplete)

// function Example() {
//   return (
//     <InstantSearch
//       appId="latency"
//       apiKey="6be0576ff61c053d5f9a3225e2a90f76"
//       indexName="actors"
//     >
//       Algolia{' '}
//       <a href="https://community.algolia.com/react-instantsearch/">
//         React InstantSearch
//       </a>{' '}
//       example
//       <AutoCompleteWithData />
//     </InstantSearch>
//   )
// }
// // render(<Example />, document.getElementById('render--filter'))
// export default Example;

