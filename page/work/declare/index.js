import Dropdown from '/components/dropdown';

Page({
  ...Dropdown,
  data: {
    dropdownSelectData: {
      active: false,
      selectedNav: 0,
      listData: [
        {
          nav: "行为积分",
          selectedItem: '',
          data: []
        },
        {
          nav: "品德积分",
          selectedItem: '',
          data: []
        },
        {
          nav: "业绩积分",
          selectedItem: '',
          data: []
        }
      ]
    }
  }
}) 