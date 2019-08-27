import React, {Component} from 'react';
import { connect } from 'react-redux';
import Youtube from '../../apis/Youtube';
import VideoList from '../videoTools/VideoList';
import VideoDetail from '../videoTools/VideoDetail';

class Video extends Component {
    state = { videos: [], selectedVideo: null};


    componentDidMount(){
        const { selectedMusculo, selectedEjercicio } = this.props;

        this.onTermSubmit(`${selectedMusculo} + ' ' ${selectedEjercicio}`);
    }

    onTermSubmit = async (term) =>{
        const response = await Youtube.get('/search', {
            params:{
                q: term
            }
        });
        this.setState({
            videos: response.data.items,
            selectedVideo: response.data.items[0]
        });
    };


    onVideoSelect = video => {
        this.setState({selectedVideo: video});
    };

    render(){
        const { selectedMusculo, selectedEjercicio } = this.props;
        return(
            <div className="ui container">
                <h1 align="center">Rutina de {selectedMusculo} - {selectedEjercicio}</h1>
                {/* <Barra onFormSubmit={this.onTermSubmit}/> */}
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail video={this.state.selectedVideo}/>
                        </div>
                        <div className="five wide column">
                            <VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos}/>
                        </div>
                    </div>
                </div>
            </div>
        );    
    }
}

const mapStateToProps = ({ musculos, ejercicios }) => {
    return { 
        selectedMusculo: musculos.selectedMusculo,
        selectedEjercicio: ejercicios.selectedEjercicio
    }
}

export default connect(mapStateToProps) (Video);