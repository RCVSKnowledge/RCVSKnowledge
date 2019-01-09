$(function() {
	

    var bootstrapper;
    var isFullSreen = false;

    var $header = $('header');
    var $manifest = $('#manifest');
    var $main = $('main');
    var $uv = $('#uv');
    var $footer = $('footer');

    window.onresize = function() {
    	resize();
    };
	   
    function resize() {
    	var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var height = (isFullSreen) ? windowHeight : windowHeight - $header.outerHeight();
        $main.height(height);
        $main.width(windowWidth);
        $uv.width(windowWidth);
        $uv.height(height);
    }
	
    function loadViewer() {
		
           // todo: update embed.js to work with script loaders.
           if (window.initPlayers && window.easyXDM) {
               initPlayers($('.uv'));
           } else {
               setTimeout(loadViewer, 100);
           }
    }
	
    function setSelectedManifest(manifestUri){

    	if (!manifestUri){
        	manifestUri = Utils.Urls.GetQuerystringParameter('manifest');
        }

        if (manifestUri &&  (  manifestUri.lastIndexOf("http://waylon.rcvsvethistory.org/", 0) === 0 ||
	                       manifestUri.lastIndexOf("https://iiif.rcvsk.org/", 0) === 0  ) )
	{
          	$('.uv').attr('data-uri', manifestUri);
        
        }	
    }	
	
	function init() {
			
		resize();

        // append uv script
        $('body').append('<script type="text/javascript" id="embedUV" src="/uv/lib/embed.js"><\/script>');

        setSelectedManifest();

        loadViewer();
    }

    init();
	
});
