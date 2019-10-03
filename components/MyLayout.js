const layoutStyle = {

  padding: 20,
  width: '100%'
}

export default function Layout(props) {
  return (
    <div style={layoutStyle}>
      {props.children}
      <style jsx global>{`
      	html, body {
      		margin: 0;
      		padding: 0;
          font-family: Arial;
      	}

    		* {
    			box-sizing: border-box;
    		}
       `}</style>
    </div>
  )
}
