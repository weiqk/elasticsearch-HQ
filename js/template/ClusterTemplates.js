var clusterTemplate = {};

clusterTemplate.Health = [
    '<a id="clusterHealthButton" class="btn btn-<%- statusClass %> " rel="popRight" data-trigger="hover"',
    'data-content="Status: <span class=\'label label-<%- statusClassLabel %>\'><%- statusText %></span>" data-html="true"',
    'href="#cluster" role="button">',
    '<i class="icon-info-sign"></i> <%- cluster_name %></a>'
].join("\n");

clusterTemplate.HealthDescribe = [
    //'<div class="row-fluid" style="padding: 15px;">',
    '<div class="well">',
    '<div class="span2 pull-left"><a href="#refreshCluster" class="btn btn-mini"  rel="tipRight" data-placement="bottom" data-html="true" data-title="Refreshing every <%- polling/1000 %> seconds.<br/>Click to Force Refresh."><i class="icon-refresh"></i> <%- lastUpdateTime %></a></div>',
    '<div class="text-center span8"><span style="font-size: 28px;">Cluster Overview</span></div>',
    '<div class="pull-right">',
    '<a href="#visualize" class="btn btn-info" rel="tipRight" data-placement="bottom" data-html="true" data-title="View Cluster Diagram">',
    '<i class="icon-sitemap"></i></a>',
    '</div>',
    '</div>',

    '<div class="row-fluid">',

    '<div class="grid" style="margin-top: 10px;">',
    '<div class="grid-title">',
    '<div class="pull-left">',
    '<div class="icon-title"><i class="icon-bar-chart"></i></div>',
    '<span>Cluster Statistics</span>',
    '<div class="clearfix"></div>',
    '</div>',
    '<div class="clearfix"></div>',
    '</div>',
    '<div class="grid-content overflow">',

    '<div class="row-fluid center-table">',
    '<div class="span2">',
    '<div class="well stat-box"><span class="stat-detail"><%- numeral(health.number_of_nodes).format("0,0") %></span><span>Nodes</span>',
    '</div></div>',
    '<div class="span2">',
    '<div class="well stat-box"><span class="stat-detail"><%- numeral(indices.shards.total).format("0,0") %></span><span>Total Shards</span>',
    '</div></div>',
    '<div class="span2">',
    '<div class="well stat-box"><span class="stat-detail"><%- numeral(indices.shards.successful).format("0,0") %></span><span>Successful Shards</span>',
    '</div></div>',
    '<div class="span2">',
    '<div class="well stat-box"><span class="stat-detail"><%- numeral(indices.count).format("0,0") %></span><span>Indices</span>',
    '</div></div>',
    '<div class="span2">',
    '<div class="well stat-box"><span class="stat-detail"><%- numeral(indices.docs.count).format("0,0") %></span><span>Total Documents</span>',
    '</div></div>',
    '<div class="span2">',
    '<div class="well stat-box"><span class="stat-detail"><%- indices.store.size %></span><span>Total Size</span>',
    '</div></div>',
    '</div>',
    '<div class="clear"></div>',
    '</div>',
    /*    '<div class="grid-content">',
     '<div class="clear"></div>',
     '<div class="clearfix"></div>',
     '</div>',*/
    '</div>', // grid

    '</div>', // row
    '<div class="row-fluid">',
    '<div class="span6">',
    '<div class="grid">',
    '<div class="grid-title">',
    '<div class="pull-left">',
    '<div class="icon-title"><i class="icon-ambulance"></i></div>',
    '<span>Cluster Health</span>',
    '<div class="clearfix"></div>',
    '</div>',
    '<div class="clearfix"></div>',
    '</div>',
    '<div class="grid-content overflow">',

    '<table class="table table-striped table-hover table-bordered  center-table">',
    '<tr>',
    '<td>Status</td>',
    '<td><span class="label label-<%- health.statusClassLabel %>"><%- health.statusText %></span></td>',
    '</tr>',
    '<tr>',
    '<td>Timed Out?</td>',
    '<td><%- health.timed_out %></td>',
    '</tr>',
    '<tr>',
    '<td># Nodes</td>',
    '<td><%- numeral(health.number_of_nodes).format("0,0") %></td>',
    '</tr>',
    '<tr>',
    '<td># Data Nodes</td>',
    '<td><%- numeral(health.number_of_data_nodes).format("0,0") %></td>',
    '</tr>',
    '<tr>',
    '<td>Active Primary Shards</td>',
    '<td><%- numeral(health.active_primary_shards).format("0,0") %></td>',
    '</tr>',
    '<tr>',
    '<td>Active Shards</td>',
    '<td><%- numeral(health.active_shards).format("0,0") %></td>',
    '</tr>',
    '<tr>',
    '<td>Relocating Shards</td>',
    '<td><%- numeral(health.relocating_shards).format("0,0") %></td>',
    '</tr>',
    '<tr>',
    '<td>Initializing Shards</td>',
    '<td><%- numeral(health.initializing_shards).format("0,0") %></td>',
    '</tr>',
    '<tr>',
    '<td>Unassigned Shards</td>',
    '<td><%- numeral(health.unassigned_shards).format("0,0") %></td>',
    '</tr>',
    '</table>',

    '<div class="clear"></div>',
    '</div>',
    '<div class="grid-content">',
    '<div class="clear"></div>',
    '<div class="clearfix"></div>',
    '</div>',
    '</div>',

    '</div>', // span

    '<div class="span6">',
    '<div class="grid">',
    '<div class="grid-title">',
    '<div class="pull-left">',
    '<div class="icon-title"><i class="icon-list"></i></div>',
    '<span>Indices</span>',
    '<div class="clearfix"></div>',
    '</div>',
    '<div class="clearfix"></div>',
    '</div>',
    '<div class="grid-content overflow">',
    '<% if (!jQuery.isEmptyObject(indices.indices)) { %>',
    '<table class="table table-bordered table-striped table-hover" id="indicesTable">',
    '<thead>',
    '<tr><th>Index</th><th># Docs</th><th>Primary Size</th><th># Shards</th><th># Replicas</th><th>Status</th></tr>',
    '</thead>',
    '<tbody>',
    '<% _.each(indices.indices.sort(function(a,b) {return (a.name > b.name) ? -1 : ((b.name > a.name) ? 11 : 0);} ), function(index) { %>',
    '<tr><td>',
    '<a href="#index/<%- index.id %>"  rel="tipRight" data-placement="bottom" data-title="Index Information"><%- index.name %></a>',
    '</td><td><%- numeral(index.total.docs.count).format("0,0") %></td><td><%- index.total.store.size %></td><td><%- numeral(index.numshards).format("0,0") %></td><td><%- numeral(index.numreplicas).format("0,0") %></td><td><%- index.status %></td></tr>',
    '<% }); %>',
    '</tbody>',
    '</table>',
    '<% } %>',

    '<div class="clear"></div>',
    '</div>',
    '<div class="grid-content">',
    '<div class="clear"></div>',
    '<div class="clearfix"></div>',
    '</div>',
    '</div>',
    '</div>'
].join("\n");
