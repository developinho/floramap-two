var AppRouter = Backbone.Router.extend({

	routes: {
		""                   : "home",
		"plants"	: "list",
		"plants/page/:page"	 : "list",
		"plants/add"         : "addPlant,
		"plants/:id"         : "wineDetails",
		"about"              : "about"
	},

	initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },

	list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var plantList = new PlantCollection();
        plantList.fetch({success: function(){
            $("#content").html(new PlantListView({model: plantList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    plantDetails: function (id) {
        var plant = new Plant({_id: id});
        plant.fetch({success: function(){
            $("#content").html(new PlantView({model: plant}).el);
        }});
        this.headerView.selectMenuItem();
    },

	addPlant: function() {
        var plant = new Plant();
        $('#content').html(new PlantView({model: plant}).el);
        this.headerView.selectMenuItem('add-menu');
	},

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    }

});

utils.loadTemplate(['HomeView', 'HeaderView', 'WineView', 'WineListItemView', 'AboutView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});