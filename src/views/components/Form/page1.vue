<template>
  <SearchForm
    ref="formView"
    :columns="formList"
    :search-param="searchParam"
    :search-col="{ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }"
  />
</template>

<script setup lang="ts" name="Form">
import { reactive } from "vue";
import { SearchProps } from "@/components/SearchForm/index.d";

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}));
const searchParam = reactive({});
const formList = reactive<SearchProps[]>([
  {
    defaultValue: "Hello",
    props: {
      prop: "name",
      label: "Activity name",
      disabled: true,
    },
    el: "input",
  },
  {
    defaultValue: 1,
    props: {
      prop: "zone",
      label: "Activity zone",
      options: [
        {
          label: "Zone one",
          value: 1,
        },
        {
          label: "Zone two",
          value: 0,
        },
      ],
    },
    el: "select",
  },
  {
    defaultValue: 1,
    props: {
      prop: "count",
      label: "Activity count",
      options,
    },
    el: "select-v2",
  },
  {
    props: {
      type: "date",
      prop: "time",
      label: "Activity time",
    },
    defaultValue: "",
    el: "date-picker",
  },
  {
    props: {
      prop: "delivery",
      label: "Instant delivery",
    },
    defaultValue: 0,
    el: "switch",
  },
  {
    props: {
      type: "textarea",
      prop: "desc",
      label: "Activity form",
    },
    defaultValue: "",
    el: "input",
  },
]);
</script>
