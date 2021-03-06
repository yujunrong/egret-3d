uniform sampler2D lightTexture ;
varying vec2 varying_uv1 ;

vec4 decode_hdr( vec4 data ){ 
    data.w = data.w * 255.0 - 128.0 ; 
    data.w = pow( 2.0 ,data.w); 
    data.xyz *= data.w ; 
    return data ; 
}

void main(void){
	vec4 lightmap = texture2D( lightTexture , varying_uv1 );
	lightmap.xyz = decode_hdr(lightmap).xyz  ;
    outColor.xyz *= lightmap.xyz ; 
}



