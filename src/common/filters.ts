import moment from "moment";
import Vue from "vue";

Vue.filter("customDateFilter", (timestamp: number) => {
    if (timestamp === 0) {
        return "--";
    } else {
        return moment(timestamp).format("YYYY-MM-DD HH:mm:ss");
    }
});
