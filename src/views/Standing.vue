<template>
    <Header msg="分組戰績"></Header><br><br><br>
    <div class="container classement text-color: white">
        <div v-if="!loading" class="row">
            <div v-for="group in Standing" class="col-12 table-responsive tb">
                <table class="table">
                    <thead>
                        <tr>
                            <th class="name" >{{ group.letter }} 組</th>
                            <th class="center" scope="col">參賽數</th>
                            <th class="center" scope="col">勝場數</th>
                            <th class="center" scope="col">和局數</th>
                            <th class="center" scope="col">敗場數</th>
                            <th class="center" scope="col">進球數</th>
                            <th class="center" scope="col">失球數</th>
                            <th class="center" scope="col">淨勝球數</th>
                            <th class="center" scope="col">積分</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(team, index) in group.teams">
                            <td class="name">{{ index + 1 }} <img :src="getFlag(team.country)" width="20" height="15">
                                <span >{{ team.name }}</span>
                            </td>
                            <td class="center">{{ team.games_played ? team.games_played : 0 }}</td>
                            <td class="center">{{ team.wins ? team.wins : 0 }}</td>
                            <td class="center">{{ team.draws ? team.draws : 0 }}</td>
                            <td class="center">{{ team.losses ? team.losses : 0 }}</td>
                            <td class="center">{{ team.goals_for ? team.goals_for : 0 }}</td>
                            <td class="center">{{ team.goals_against ? team.goals_against : 0 }}</td>
                            <td class="center">{{ team.goal_differential ? team.goal_differential : 0 }}</td>
                            <td class="center">{{ team.group_points ? team.group_points : 0 }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-else class="chargement">
                <div class="d-flex justify-content-center align-items-center">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
        </div>
    </div>
    <br><br><br><br>
</template>
<script>
import Header from "../components/Header.vue";
import flags from '../store/flag.js'
import req from '../store/'
import { standing } from "../utils/index.js"

export default{
    components:{
        Header,
    },
    data(){
        return {
            loading: true,
            Standing: []
        }
    },

    created(){
        this.fetchStanding()
    },

    methods: {
        getFlag: function(code){
            return flags[code]
        },
        fetchStanding: function(){
            const that = this
            req.get(standing)
            .then(function(response){
                that.Standing = response.data.groups
                that.loading = false
            });
        }
    }
}
</script>

<style>

.classement .table{
    background-color: #360000;
    font-size: 15px;
    color: white;
    
    
}
 
.classement .table .name{
    white-space: nowrap;
    min-width: 155px;
}
.classement .table .name span{
    margin-left: 5px;
}
 
.center{
     text-align: center;
}
</style>