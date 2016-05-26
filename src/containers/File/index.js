import React, {Component} from 'react'

class File extends Component {

  render (){

    return (
      <div class="container width-max" style="padding-top: 20px">

        <div class="paper">

          <div class="title clearfix">
            <div class="pull-left">路径:</div>
            <ul class="pathbar pull-left clearfix">
              {/*
          var result  = path.split('/');
          console.log(result);
          var pathes = _.clone(result);
          _.map(result, function(item, index){
              if (index>0){
              if (item!='') {
              item=result[index]=result[index-1]+'/'+item;
              } else {
              return false
            }
          }
        %}
              <li>
                <a href="{{conf.hrefPrefix}}/file?path={{item==''?'/':item}}">{{pathes[index]==''?'/':pathes[index]}}</a>
              </li>
              {%
          })
          */}
            </ul>
            <div class="pull-right">

              <button class="btn btn-sm btn-primary fileinput-button"  id="imageupload" style="overflow: hidden;position: relative">
                <span>上传文件</span>
                <input type="file" name="file" class="input-file" />
              </button>

              <div class="upload-bar">

                <div class="upload-fail"></div>
                <div class="upload-progress">
                  <div class="progress-bar"></div>
                </div>
              </div>

            </div>
          </div>

          <div id="files-container"></div>

        </div>

      </div>
    )

  }

}

export default File
