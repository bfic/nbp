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
          width: 100%;
          float: left;
          min-width: 400px;
      	}

    		* {
    			box-sizing: border-box;
    		}

        h2 {
          display: block;
          width: 100%;
          float: left;
        }

        a {
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }

       `}</style>
    </div>
  )
}
